function randomCuteText(){
    const correctWords = [":3", "mrrreow", "meeeow", "meow"]
    const rand = Math.floor(Math.random() * correctWords.length)
    return correctWords[rand]
}

function getRandomImage() {
    const images = [
        'https://i.imgur.com/J8EEcTo.jpeg', 
        'https://i.imgur.com/nYdRfNU.jpeg', 
        'https://i.imgur.com/oi2FdT3.jpeg',
        'https://i.imgur.com/2FwAQMO.jpeg',
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
}

function stopAutoplay(ad){
    const videos = ad.querySelectorAll('video')
    videos.forEach(video => {
        video.pause();
        video.removeAttribute('autoplay');
    });
}

function replaceProfileImage(ad) {
    const profilePicDiv = ad.querySelector('div[style*="background-image"]');
    if (profilePicDiv) {
        profilePicDiv.style.backgroundImage = `url(${getRandomImage()})`;
    }
}

function replaceBackgroundImagesInTweet(ad) {
    const allDivs = ad.querySelectorAll('div');  

    allDivs.forEach(div => {
        if (div.style.backgroundImage) {
            div.style.backgroundImage = `url(${getRandomImage()})`;
        }
    });
}

function replaceEachWordInTweet(ad){
    const outerTweetText = ad.querySelectorAll('[data-testid="tweetText"]');
    outerTweetText.forEach((elements) => {
        const words = elements.textContent.split(' ');
        const cuteWords = words.map(() => randomCuteText());
        elements.textContent = cuteWords.join(' ')
    })
}

function replaceUsernameAd(ad){
    const usernameAd = ad.querySelector('[data-testid="User-Name"]');
    if(usernameAd){
        usernameAd.textContent = randomCuteText();
    }
}

function replaceAds() {
  const ads = document.querySelectorAll('[data-testid="placementTracking"]');
  ads.forEach((ad) => {
    if(ad.hasAttribute('data-modified')){
        return;
    }

    stopAutoplay(ad);
    replaceBackgroundImagesInTweet(ad);
    replaceProfileImage(ad);
    replaceEachWordInTweet(ad);
    replaceUsernameAd(ad);
    
    //ako ne se set-va attribute vsqka sekunda shte promenq teksta
    //kinda fun honestly
    ad.setAttribute('data-modified', 'true')
  });
}

setInterval(replaceAds, 1000);
