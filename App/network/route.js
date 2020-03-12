import ParanuLog from "../Helper/ParanuLog";


export default class Route {

    constructor(rootUrl) {
        this.rootUrl = rootUrl;
    }

    get = (url) => {
        return fetch(this.rootUrl + url)
            
            .then(response => response.json())
            .catch(e => e)
    }
    getAuthenticated = (url,token) => {
        return fetch(this.rootUrl  + url,{
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            },
        })

            .then(response => response.json())
            .catch(e => e)
    }
    getAuthenticatedMessage = (url,token) => {
        //console.log("URL actually"+this.rootUrl  + url);
        const wholeUrl = this.rootUrl  + url
        // ParanuLog.debug(`wholeUrl: ${wholeUrl} token: ${token}`)
        return fetch(wholeUrl ,{
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            method: "POST"
        }).then(response => response.json())
        .catch(e => e)
    }
    sendMessage = (url,data,token) => {
        // console.log("URL actually"+this.rootUrl  + url);
        return fetch(this.rootUrl  + url,{
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
        })

            .then(response => response.json())
            .catch(e => e)
    }

    post = (url) => {
        return fetch(this.rootUrl + url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
        }).then(this.checkStatus)
            .then(response => response.json())
            .catch(e => e)
    }
    put = (url,data,token) => {
        //console.log("datRecievingFromIn",this.rootUrl + url +"    "+JSON.stringify(data))
        return fetch(this.rootUrl + url, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify(data)
        })  .then(response => response.json())
        .catch(e => e)
    }
    UploadImage = (url,data,token) => {
        return fetch(this.rootUrl + url, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            },
            method: "PUT",
            body: data
        })  .then(response => response.json())
        .catch(e => e)
    }


    updateData = (url, data,token) => {
        // console.log("dataurl",this.rootUrl + url)
        return fetch(this.rootUrl + url, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
        })


            .then(response => response.json())
            .catch(e => e);
    }

    postdata = (url, data) => {
        return fetch(this.rootUrl + url, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify(data)
        })
          
          
          .then(response => response.json())
          .catch(e => e);
    }

    postfile = (url, data) => {
        return fetch(this.rootUrl + url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            },
            method: "POST",
            body: data
        })
            .then(this.checkStatus)
            .then(response => response.json())
            .catch(e => e)
    }
    deleteApi = (url,data) => {
        return fetch(this.rootUrl + url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "DELETE",
            body: data
        })
            .then(this.checkStatus)
            .then(response => response.json())
            .catch(e => e)
    }

    postfile_x = (url, data) => {
        return fetch(this.rootUrl + url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            },
            method: "POST",
            body: data
        });
    }

    checkStatus = (response) => {
        if (response.ok) {
            return response;
        }
        
        else {
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    }
}