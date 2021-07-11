import axios from 'axios'

const mAxiosClient = ({req}) =>{

    if(typeof window === 'undefined')
    {
            //We are on the SERVER
            //Request shoul be to http:ingress-nginx.......
            //http://SERVICENAME.NAMESPACE.svc.cluster.local

        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers
        });

    }else{
        //We are on the Browser
        return axios.create({
            baseURL:'/'
        });

    }
}

export default mAxiosClient;