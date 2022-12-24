window.addEventListener("load", () => {
    document.getElementById("record").onclick = function (){
        window.stream = navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: confirm("do you want to record the audio too?")
        })
        window.stream.then((stream) => {
            console.log("streaming!!")
            window.recorder = new MediaRecorder(stream, {
                mimeType: "video/mp4; codecs=vp9"
            })
            window.chunks = [];
            window.recorder.ondataavailable = function(e){

                window.chunks.push(e.data)
            }
            window.recorder.onstop = () => {
                stop()
            }
            window.recorder.start()
        })
    }

    document.getElementById("stop").onclick = function (){
        stop()
    }

    function stop(){
        window.stream.then((stream) => {
            chunks = window.chunks
            console.log(chunks)
            window.track = stream.getVideoTracks()[0]
            window.track.stop()
    
            window.blob = new Blob(chunks, {
                type: chunks[0].type
            })
    
            a = window.document.createElement("a")
            a.href = URL.createObjectURL(window.blob)
            a.download = (prompt("can you please enter the filename (the extension will be .mp4)") || "recorded") + ".mp4"
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a) 
        }) 
    }
})
