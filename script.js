console.log("Welcome to spotify");
// Initialize the Variables
const pauseIconClassName = 'fa-solidfa-circle-pause'
const playIconClassName = 'fa-solidfa-circle-play'
let songindex=0;
let audioElement=new Audio('songs/1.mp3');
let masterplay=document.getElementById('masterplay');
let myprogressbar=document.getElementById('myprogressbar');
let gif=document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems=Array.from(document.getElementsByClassName('songItem'));
let songs=[
    {songName: "Hairat-Anjaana Anjaani", filePath: "songs/1", coverPath: "covers/1.jpg"},
    {songName: "Hey Ya!-Clinton Cerejo", filePath: "songs/2", coverPath: "covers/2.jpg"},
    {songName: "Ishq Bulava-Hasee toh phasee", filePath: "songs/3", coverPath: "covers/3.jpg"},
    {songName: "Choomantar", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Suno Aisha - Aisha", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Sooraj ki bahon mein-Shankar,Ehsaan", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Banjaara-Ek tha tiger", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Ahista Ahista", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Taake Jhanke-Queen", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Gale lag ja-De dana dan", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})

//handle play,pause
masterplay.addEventListener('click',()=>{
    if(audioElement.paused||audioElement.currentTime<=0){
        audioElement.play();
        masterplay.classList.remove(playIconClassName);
        masterplay.classList.add(pauseIconClassName);
        gif.style.opacity=1;
    }else{
        audioElement.pause();
        masterplay.classList.remove(pauseIconClassName);
        masterplay.classList.add(playIconClassName);
        gif.style.opacity=0;
    }
})

  //listen to events
audioElement.addEventListener('timeupdate',()=>{
    //update seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myprogressbar.value=progress;
})
myprogressbar.addEventListener('change',()=>{
    audioElement.currentTime=myprogressbar.value*audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove(pauseIconClassName);
        element.classList.add(playIconClassName);
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songindex = parseInt(e.target.id);
        e.target.classList.remove(playIconClassName);
        e.target.classList.add(pauseIconClassName);
        audioElement.src = `songs/${songindex+1}.mp3`;
        masterSongName.innerText = songs[songindex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterplay.classList.remove(playIconClassName);
        masterplay.classList.add(pauseIconClassName);
    })
})
    document.getElementById('next').addEventListener('click', ()=>{
    if(songindex>=9){
        songindex = 0
    }
    else{
        songindex += 1;
    }
    audioElement.src = `songs/${songindex+1}.mp3`;
    masterSongName.innerText = songs[songindex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove(playIconClassName);
    masterplay.classList.add(pauseIconClassName);
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songindex<=0){
        songindex = 0;
    }
    else{
        songindex -= 1;
    }
    audioElement.src = `songs/${songindex+1}.mp3`;
    masterSongName.innerText = songs[songindex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove(playIconClassName);
    masterplay.classList.add(pauseIconClassName);
})