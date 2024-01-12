console.log("WelcomeTo Spotify")
//Initialize the variables
let songIndex=0;
let masterPlay= document.getElementById('masterPlay')
let audioElement = new Audio("songs/1.mp3");
let myProgressBar = document.getElementById('myProgressBar')
let masterSongName = document.getElementById('masterSongName')
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
  {songName:"Let Me love You", filePath:"songs/1.mp3", coverPath:"covers/1.jpg"},
  {songName:"Midnight Rain", filePath:"songs/2.mp3", coverPath:"covers/1.jpg"},
  {songName:"Anti Hero", filePath:"songs/3.mp3", coverPath:"covers/1.jpg"},
  {songName:"Traitor", filePath:"songs/4.mp3", coverPath:"covers/1.jpg"},
  {songName:"Drivers License", filePath:"songs/5.mp3", coverPath:"covers/1.jpg"},

]

songItems.forEach((element, i) => {
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText =songs[i].songName;
})

// audioElement.play();
// handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle')
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle')
    }
})
//listen to Events

audioElement.addEventListener('timeupdate', ()=>{
    // console.log('timeupdate');
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime =myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) =>{
        element.classList.remove('fa-pause-circle');
      element.classList.add('fa-play-circle');
     }
 )}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) =>{
    element.addEventListener('click' , (e) =>{
      // console.log(e.target);
       makeAllPlays();
       songIndex = parseInt(e.target.id)
       e.target.classList.remove('fa-play-circle')
       e.target.classList.add('fa-pause-circle')
       audioElement.src=`songs/${songIndex+1}.mp3`;
       masterSongName.innerText = songs[songIndex].songName;
       audioElement.currentTime=0;
       audioElement.play();
       masterPlay.classList.remove('fa-play-circle');
       masterPlay.classList.add('fa-pause-circle')
    })
})


document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=4){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
       audioElement.currentTime=0;
       audioElement.play();
       masterPlay.classList.remove('fa-play-circle');
       masterPlay.classList.add('fa-pause-circle')
})


document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
       masterSongName.innerText = songs[songIndex].songName;
       audioElement.currentTime=0;
       audioElement.play();
       masterPlay.classList.remove('fa-play-circle');
       masterPlay.classList.add('fa-pause-circle')
})