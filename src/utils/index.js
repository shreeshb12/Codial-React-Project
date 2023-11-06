export * from './constants';

export const setItemInLocalStorage=(key,value)=>{
    if(key==null || value==null)
    {
       return console.error('Cannot set the value in local storage');
    }
    const storeValue=typeof value !== 'string'?JSON.stringify(value):value;

    localStorage.setItem(key,storeValue);
}

export const getItemFromLocalStorage=(key)=>{
    if(key==null)
    {
       console.error('Cannot get the value from local storage');
       return null;
    }

    return localStorage.getItem(key);
}

export const removeItemFromLocalStorage=(key)=>{
    if(key==null)
    {
       console.error('Cannot remove the value from local storage');
       return null;
    }

    return localStorage.removeItem(key);
}

export const getFormBody=(params)=>{
 
    let formbody=[];

    for(let property in params)
    {
        let encodeKey=encodeURIComponent(property);
        let encodeValue=encodeURIComponent(params[property]);

        formbody.push(encodeKey+'='+encodeValue);
    }

    return formbody.join('&');

}