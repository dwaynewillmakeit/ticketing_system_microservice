 import axios from 'axios'

 const LandingPage = ({currentUser}) =>{

  //The currentUser prop is being retrived from the getInitailProps method

  console.log(currentUser);


  return  <h1>Landing Page</h1>
}

LandingPage.getInitialProps = async ({req}) =>{

  //
  if(typeof window === 'undefined')
  {
    console.log(req.headers)
    //We are on the SERVER
    //Request shoul be to http:ingress-nginx.......
    //http://SERVICENAME.NAMESPACE.svc.cluster.local
    try{
      const {data} = await axios
                    .get('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',{
                      headers:req.headers
                    });
                    

                    return data;
    }catch(err){
      console.log(err.toJSON());

      return {};
    }
    

  }else{
    //We are on the Browser
    const {data} = await axios.get('/api/users/currentuser');
   
    return data;

  }

}

export default LandingPage;