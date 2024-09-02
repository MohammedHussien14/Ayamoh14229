document.getElementById('myButton').addEventListener('click', function() {
    // Play sound
    var audio = new Audio('a2.mp3');
    audio.play();
    
    // Redirect to another website after 1 second (1000 milliseconds)
    setTimeout(function() {
      window.location.href = 'index1.html';
    }, 34000);
 
 });
  