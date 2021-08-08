function invalidateSnowflake(){
    snowflake.style.borderColor = 'red'
    setTimeout(() => {
        snowflake.style.borderColor = ""
    }, 5000) 
}

function resetEverything(){
    document.getElementById('snowflake').value = ''
    document.getElementById('timezone').innerHTML = 'No results here yet.'
    document.getElementById('time').innerHTML = 'Enter an ID and hit convert.'
    document.getElementById('discordMarkdown').value = ''
    document.getElementById('epoch').value = ''
}

function copyText(element, btn){
    let input = document.getElementById(element);
    navigator.clipboard.writeText(input.value);

    btn = document.getElementById(btn);
    btn.innerHTML = "Copied!"

    setTimeout(() => {
        btn.innerHTML = 'Copy'
    }, 2000)
}

function convertSnowflake(){
    let snowflake = document.getElementById('snowflake');
    if(!snowflake.value){
        invalidateSnowflake()
        return;
    }
    else if(isNaN(Number(snowflake.value))){
        invalidateSnowflake()
        return;
    }

    // Main conversion logic.

    /* 1420070400000 is the discord epoch. */

    let timestamp = new Date(snowflake.value / 4194304 + 1420070400000)
    
    let timezone = document.getElementById('timezone')
    timezone.innerHTML = Intl.DateTimeFormat().resolvedOptions().timeZone

    let time = document.getElementById('time')
    time.innerHTML = `${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()} on 0${timestamp.getDay()} ${timestamp.toLocaleString('default', { month: 'long' })} ${timestamp.getFullYear()}` 

    let markdown = document.getElementById('discordMarkdown')
    markdown.value = `<t:${timestamp.getTime()}>`

    let epoch = document.getElementById('epoch')
    epoch.value = timestamp.getTime()
}