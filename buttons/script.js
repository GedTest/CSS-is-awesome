// document.addEventListener("DOMContentLoaded", function() {
//     const dot = document.querySelector('.dot');
//     const container = document.querySelector('.container');
//     const magneticButton = document.querySelector('.magnetic-button');
//     const containerRect = container.getBoundingClientRect();
//     const aspectRatio = containerRect.width / containerRect.height;

document.addEventListener("DOMContentLoaded", function() {
    const containers = document.querySelectorAll('.container');
    const dot = document.querySelector('.dot');

    const containerInfo = Array.from(containers).map((container, index) => {
        const rect = container.getBoundingClientRect();
        const aspectRatio = rect.width / rect.height;
    
        container.addEventListener('mouseenter', () => container.classList.add('hovered'));
    
        container.addEventListener('mouseleave', () => {
            container.classList.remove('hovered');
            setButtonPosition({ X: 0, Y: 0 }, index);
        });
    
        return { container, rect, aspectRatio };
    });


    document.addEventListener('mousemove', e => {
        requestAnimationFrame(() => {
            containerInfo.forEach((_, index) => {
                moveDot({ X: e.clientX, Y: e.clientY });
                moveMagneticButton({ X: e.clientX, Y: e.clientY }, index);
            });
        });
    });

    function moveDot(mousePosition) {
        dot.style.left = `${mousePosition.X}px`;
        dot.style.top = `${mousePosition.Y}px`;
    }

    function moveMagneticButton(mousePosition, index) {
        const container = containerInfo[index].container;
        const rect = containerInfo[index].rect;
        const aspectRatio = containerInfo[index].aspectRatio;

        if (container.classList.contains('hovered')) {
            const relativeX = (mousePosition.X - rect.left) / rect.width;
            const directionX = relativeX - 0.5;
            const relativeY = (mousePosition.Y - rect.top) / rect.height;
            const directionY = relativeY - 0.5;

            const offset = 40;
            setButtonPosition({ X: aspectRatio * offset * directionX, Y: offset * directionY }, index);
        }
    }

    function setButtonPosition(mousePosition, index) {
        const magneticButton = containerInfo[index].container.querySelector('.magnetic-button');
        magneticButton.style.left = `${mousePosition.X}px`;
        magneticButton.style.top = `${mousePosition.Y}px`;
    }
});
