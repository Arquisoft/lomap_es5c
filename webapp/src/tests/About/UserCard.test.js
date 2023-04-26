import {render} from "../../setupTests";
import UserCard from "../../components/About/UserCard";

describe("UserCard", () => {
    const user = {
        alt: 'xin',
        username: 'Xin',
        userTitle: 'Web Developer',
        description: 'Xinpan',
        mail: 'xin@example.com',
        githubLink: 'https://github.com/Xin',
        twitterLink: 'https://twitter.com/Xin',
        linkedinLink: 'https://linkedin.com/in/Xin'
      };
    
    
      test('should display user information', () => {
        const { getByText } = render(<UserCard user={user} />);
        expect(getByText(user.username)).toBeInTheDocument();
        expect(getByText(user.userTitle)).toBeInTheDocument();
        expect(getByText(user.description)).toBeInTheDocument();
        expect(getByText(user.mail)).toBeInTheDocument();
      });
    
      test('should render GitHub link if user has a GitHub profile', () => {
        const { getByAltText } = render(<UserCard user={user} />);
        const githubLink = getByAltText('GitHub profile').parentElement;
        expect(githubLink.href).toBe(user.githubLink);
      });
    
      test('should not render GitHub link if user does not have a GitHub profile', () => {
        const userWithoutGithub = { ...user, githubLink: {} };
        const { queryByAltText } = render(<UserCard user={userWithoutGithub} />);
        const githubLink = queryByAltText('GitHub profile');
        expect(githubLink).not.toBeInTheDocument();
      });
    
      test('should render Twitter link if user has a Twitter profile', () => {
        const { getByAltText } = render(<UserCard user={user} />);
        const twitterLink = getByAltText('Twitter profile').parentElement;
        expect(twitterLink.href).toBe(user.twitterLink);
      });
    
      test('should not render Twitter link if user does not have a Twitter profile', () => {
        const userWithoutTwitter = { ...user, twitterLink: {} };
        const { queryByAltText } = render(<UserCard user={userWithoutTwitter} />);
        const twitterLink = queryByAltText('Twitter profile');
        expect(twitterLink).not.toBeInTheDocument();
      });
    
      test('should render LinkedIn link if user has a LinkedIn profile', () => {
        const { getByAltText } = render(<UserCard user={user} />);
        const linkedinLink = getByAltText('Linkedin profile').parentElement;
        expect(linkedinLink.href).toBe(user.linkedinLink);
      });
    
      test('should not render LinkedIn link if user does not have a LinkedIn profile', () => {
        const userWithoutLinkedin = { ...user, linkedinLink: {} };
        const { queryByAltText } = render(<UserCard user={userWithoutLinkedin} />);
        const linkedinLink = queryByAltText('Linkedin profile');
        expect(linkedinLink).not.toBeInTheDocument();
      });
});