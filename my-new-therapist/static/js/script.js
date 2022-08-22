const url = 'https://randomuser.me/api/?results=10'; // Get 10 random users
fetch(url)
    .then(resp => resp.json())
    .then(data => {
        let therapistsArray = data.results;
        console.log(data.results);
        for (i=0; i<(therapistsArray.length); i++) {
            let therapistContainer = document.createElement('div');
            therapistContainer.setAttribute('class', "therapist-block");
            therapistContainer.id = `therapist-${i+1}`;
            let therapistImage = document.createElement('img');
            let therapistName = document.createElement('p');
            therapistName.setAttribute('class', "therapist-name");
            therapistName.appendChild(document.createTextNode(`${therapistsArray[i].name.first} ${therapistsArray[i].name.last}`));
            therapistImage.src = therapistsArray[i].picture.large;
            therapistContainer.appendChild(therapistImage);
            therapistContainer.appendChild(therapistName);
            document.getElementById('main-contain').appendChild(therapistContainer);
        }
    });