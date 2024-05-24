import React from "react"
import Script from 'next/script'

function Chatbot(){
    return(
        <div>
            <Script src="https://cdn.botpress.cloud/webchat/v1/inject.js"></Script>
            <Script src="https://mediafiles.botpress.cloud/eacbf454-69c0-4f33-8a92-f53059a128af/webchat/config.js" defer></Script>
        </div>
    )
}