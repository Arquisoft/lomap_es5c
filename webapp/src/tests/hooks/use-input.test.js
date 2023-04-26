import { renderHook, act, waitFor } from '@testing-library/react';
import useInput from '../../hooks/use-input';

describe('useInput', () => {
  test('should return an object with the correct properties', () => {
    const { result } = renderHook(() => useInput(value => value !== ''));
    expect(result.current).toHaveProperty('value');
    expect(result.current).toHaveProperty('isValid');
    expect(result.current).toHaveProperty('hasError');
    expect(result.current).toHaveProperty('valueChangeHandler');
    expect(result.current).toHaveProperty('inputBlurHandler');
    expect(result.current).toHaveProperty('reset');
  });

  test('should update the value when valueChangeHandler is called', () => {
    const { result } = renderHook(() => useInput(value => value !== ''));
    act(() => {
      result.current.valueChangeHandler({ target: { value: 'test' } });
    });
    waitFor(() =>expect(result.current.value).toEqual('test'));
  });

  test('should update isTouched when inputBlurHandler is called', () => {
    const { result } = renderHook(() => useInput(value => value !== ''));
    act(() => {
      result.current.inputBlurHandler();
    });
    waitFor(() =>expect(result.current.isTouched).toEqual(true));
  });

  test('should update isValid based on the validation function', () => {
    const { result } = renderHook(() => useInput(value => value !== ''));
    expect(result.current.isValid).toEqual(false);
    act(() => {
      result.current.valueChangeHandler({ target: { value: 'test' } });
    });
    expect(result.current.isValid).toEqual(true);
  });

  test('should update hasError based on the validation function and isTouched', () => {
    const { result } = renderHook(() => useInput(value => value !== ''));
    expect(result.current.hasError).toEqual(false);
    act(() => {
      result.current.inputBlurHandler();
    });
    expect(result.current.hasError).toEqual(true);
    act(() => {
      result.current.valueChangeHandler({ target: { value: 'test' } });
    });
    expect(result.current.hasError).toEqual(false);
  });

  test('should reset the value and isTouched when reset is called', () => {
    const { result } = renderHook(() => useInput(value => value !== ''));
    act(() => {
      result.current.valueChangeHandler({ target: { value: 'test' } });
      result.current.inputBlurHandler();
      result.current.reset();
    });
    expect(result.current.value).toEqual('');
    waitFor(() =>expect(result.current.isTouched).toEqual(false));
  });

});
