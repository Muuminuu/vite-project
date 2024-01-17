
    async function getPosts() {
        const reponse = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=50`)
        
        const data = await reponse.json()
        return data
    }
        
    async function getAuthor(post){
        const author = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`) 
        const data = await author.json();
        return data
    }

    async function getComments(post){
        const comments = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`) 
        const data = await comments.json();
        return data
    }

    const container = document.getElementById('posts-container')
    const template = document.getElementById('posts-container-tpl')

    const container2 = document.getElementById('comments-container')
    const template2 = document.getElementById('comments-tpl')

    function toggleComments(postId){
        const commentsElement = document.querySelector(`#${postId} .comments-container`)
        commentsElement.classList.toggle('hide')
    }


    const afficherCommentaires = function(recupComments, commentsContainer){
        for (let j = 0; j < recupComments.length;j++) {
            const commentaire = recupComments[j];
            const tcom = template2.content.cloneNode(true)
            const com = tcom.querySelector('.comment')
            const email = tcom.querySelector('.email')
            const imgsAv = tcom.querySelector('img')

            let splittedEmail = commentaire.email.split('@')
            console.log(splittedEmail[0])
            //console.log(element.id,recupComments.postId)
            com.innerText = commentaire.body
            email.innerText = splittedEmail[0]
            imgsAv.src = `https://ui-avatars.com/api/?name=${splittedEmail[0]}&background=random`

            commentsContainer.append(tcom)
        }
    }

    const ecrirePostsEtTitre = async function() {
        const recup = await getPosts()
        for (let i=0; i< recup.length; i++){
            const element = recup[i]
            const recupAuteur = await getAuthor(element)
            const recupComments = await getComments(element)
            const tr = template.content.cloneNode(true)
            tr.querySelector('.post').id = `post-${element.id}`
            const htwos = tr.querySelector('h2')
            const ps = tr.querySelectorAll('p')
            const imgs = tr.querySelector('img')
            let splittedName= recupAuteur.name.split(' ')
            htwos.textContent = element.title
            ps[1].textContent = element.body
            ps[0].textContent = recupAuteur.name
            ps[2].textContent = `${recupComments.length} commentaire(s)`
            imgs.src = `https://ui-avatars.com/api/?name=${splittedName[0]}+${splittedName[1]}&background=random`   

            ps[2].addEventListener("click", function(){
                toggleComments(`post-${element.id}`)
            })

            const commentsContainer = tr.querySelector('.comments-container')
            afficherCommentaires(recupComments, commentsContainer)  
            container.append(tr)
        }
    }

ecrirePostsEtTitre()



