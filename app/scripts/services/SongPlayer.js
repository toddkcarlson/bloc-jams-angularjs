 (function() {
     function SongPlayer(Fixtures) {
          var SongPlayer = {};

          var currentAlbum = Fixtures.getAlbum();

 /**
 * @desc Buzz object audio file
 * @type {Object}
 */     	  
     	  var currentBuzzObject = null;
 /**
 * @function setSong
 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 * @param {Object} song
 */
		  var setSong = function(song) {
	  		    if (currentBuzzObject) {
			        currentBuzzObject.stop();
			        SongPlayer.currentSong.playing = null;
			    }
			 
			    currentBuzzObject = new buzz.sound(song.audioUrl, {
			        formats: ['mp3'],
			        preload: true
			    });
			 
			  SongPlayer.currentSong = song;
		  };
 /**
 * @function playSong
 * @desc Plays the currentBuzzObject file
 * @param {Object} song
 */
		  var playSong = function(song){
		  		currentBuzzObject.play();
         		song.playing = true;
		  };
  /**
 * @function stopSong
 * @desc Stops the currentBuzzObject file
 * @param {Object} song
 */
          var stopSong = function(song){
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
          };
 /**
 * @function getSongIndex
 * @desc Get the index of a song
 * @param {Object} song
 */
          var getSongIndex = function(song) {
                return currentAlbum.songs.indexOf(song);
          };             	  
 /**
 * @function getLastSongIndex
 * @desc Get the index of the last song
 * @param {Object} song
 */
          var getLastSongIndex = function(song) {
                return currentAlbum.songs.lastIndexOf(song);
          };     
 /**
 * @desc Stores the current song
 * @type {Object}
 */  
          SongPlayer.currentSong = null;
 /**
 * @method SongPlayer.play
 * @desc Plays (and loads if needed) the current song 
 * @param {Object} song
 */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };
 /**
 * @function SongPlayer.pause
 * @desc Pause the current song
 * @param {Object} song
 */
 		  SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
     		currentBuzzObject.pause();
     		song.playing = false;
 		  };

 /**
 * @function SongPlayer.previous
 * @desc Go to the previous song
 */
          SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
                stopSong(play);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
          }; 
 /**
 * @function SongPlayer.next
 * @desc Go to the next song
 */
          SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;

            if (currentSongIndex === getLastSongIndex) {
                stopSong(play);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
          };
          
          return SongPlayer;
     }          
 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();