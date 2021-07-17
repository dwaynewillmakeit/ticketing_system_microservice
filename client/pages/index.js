 import axios from 'axios'
 import buildClient from '../api/build-client'

 const LandingPage = ({currentUser}) =>{

  //The currentUser prop is being retrived from the getInitailProps method
return currentUser ? <h1>You are logged In</h1>: <h1>You are not logged in</h1>
}

LandingPage.getInitialProps = async (context) =>{

  const client = buildClient (context);

  const {data} = await client.get('/api/users/currentuser');

  return data;
 

}

export default LandingPage;