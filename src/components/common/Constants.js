const prod = {
    url: {
      API_BASE_URL: 'http://mr-app-env.eba-j6sddxiv.us-east-2.elasticbeanstalk.com',
      OAUTH2_REDIRECT_URI: 'http://mr-app-env.eba-j6sddxiv.us-east-2.elasticbeanstalk.com/oauth2/redirect'
    }
  }
  
  const dev = {
    url: {
      API_BASE_URL: 'http://localhost:8080',
      OAUTH2_REDIRECT_URI: 'http://localhost:3000/oauth2/redirect'
    }
  }
  
  export const config = process.env.NODE_ENV === 'development' ? dev : prod