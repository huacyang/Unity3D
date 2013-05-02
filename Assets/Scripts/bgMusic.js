#pragma strict

// @credit to Alienchild: http://forum.unity3d.com/threads/130113-Free-Simple-but-effective-background-music-player-(JS) 

var RandomStart : boolean = false;
var SongList : AudioClip[];
private var SongNumber : int = 0;
private var Music : AudioSource;
private var timer : float;
private var play : boolean = true;

function Start() {
	gameObject.AddComponent(AudioSource);

    if(RandomStart) {
        SongNumber = Random.Range(0,SongList.Length);
    }

    Music = gameObject.GetComponent(AudioSource);
    Music.loop = false;
    Music.playOnAwake = true;
    Music.clip = SongList[SongNumber];
    Music.volume = 0.3;
    audio.Play();
}

function Update() {
    timer = timer + Time.deltaTime;
    
    if(timer > (audio.clip.length + 1) && play == true) {
        play = false;

        if(SongNumber < (SongList.Length-1)) {
            SongNumber = SongNumber + 1;
        } else {
            SongNumber = 0;
        }

        Music.clip = SongList[SongNumber];
        audio.Play();
        timer = 0;
        play = true;
    }
}