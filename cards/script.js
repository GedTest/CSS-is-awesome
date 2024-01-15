const containers = document.querySelectorAll('.container');


containers.forEach(container => {
    container.addEventListener('mousemove', function(e) {
        const containerRect = this.getBoundingClientRect();
        const mousePosition = {
            X: e.clientX - containerRect.left,
            Y: e.clientY - containerRect.top
        };
        
        const cursor = this.querySelector('.revealing-cursor');
        moveCursor(mousePosition, cursor);

        const textElement = this.querySelector('.text');
        moveGradient(mousePosition, containerRect, textElement);

        const card = this.querySelector('.crypted-card');
        generateRandomTextBackground(card, textElement);
    });
});

function moveCursor(mousePosition, cursor) {
    cursor.style.left = `${mousePosition.X - cursor.offsetWidth/2}px`;
    cursor.style.top = `${mousePosition.Y - cursor.offsetHeight/2}px`;
}

function moveGradient(mousePosition, containerRect, textElement) {
    const gradientX = (mousePosition.X / containerRect.width) * 100;
    const gradientY = (mousePosition.Y / containerRect.height) * 100;
    textElement.style.backgroundPosition = `${gradientX}% ${gradientY}%`;
}

function generateRandomTextBackground(element, textElement) {
    const fontSize = parseFloat(getComputedStyle(element).fontSize);

    let finalString = '';
    for(let i = 0; i < element.offsetHeight / fontSize; i++) {
        finalString += generateRandomString(element.offsetWidth / fontSize*2);
    }
    
    textElement.innerText = finalString;
}

function generateRandomString(length) {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    const randomStringArray = [];

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        randomStringArray[i] = characters.charAt(randomIndex);
    }

    return randomStringArray.join('') + '\n';
}
