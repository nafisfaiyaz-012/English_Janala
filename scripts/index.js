const loadAllLevels = () => {
    const url = 'https://openapi.programming-hero.com/api/levels/all';

    fetch(url)
    .then(response => response.json())
    .then(json => displayLevels(json.data));
}

const displayLevels = (lessons) => {

    const levelContainer = document.getElementById('lesson-container');
    levelContainer.innerHTML = '';

    lessons.forEach(lesson => {
        const lessonDiv = document.createElement('div');

        lessonDiv.innerHTML = `
        <button href="" class="btn btn-outline btn-primary">
            <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
        </button>
        `
        
        levelContainer.appendChild(lessonDiv);
        
    });
    
}
loadAllLevels();