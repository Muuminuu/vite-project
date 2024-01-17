 
    async function getPosts() {
        const reponse = await fetch(`https://jsonplaceholder.typicode.com/posts`)
        
        const data = await reponse.json()
        console.log(data)
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
                    console.log(data)
                    return data
                }

        // Je séléctionne mon tbody, où on ajoutera la copie de notre template = injection du code modifié dans la page html
        const container = document.getElementById('posts-container')
        // Je séléctionne mon template
        const template = document.getElementById('posts-container-tpl')

        const ecrirePostsEtTitre = async function() {
            const recup = await getPosts()
            for (let i=0; i< recup.length; i++){
                const element = recup[i]
                const recupAuteur = await getAuthor(element)
                const recupComments = await getComments(element)
                console.log(recupAuteur)         
                const tr = template.content.cloneNode(true)
                const htwos = tr.querySelector('h2')
                const ps = tr.querySelectorAll('p')
                const imgs = tr.querySelector('img')
                let splittedName= recupAuteur.name.split(' ')
                htwos.textContent = element.title
                ps[1].textContent = element.body
                ps[0].textContent = recupAuteur.name
                ps[2].textContent = `${recupComments.length} commentaire(s)`
                imgs.src = `https://ui-avatars.com/api/?name=${splittedName[0]}+${splittedName[1]}&background=random`
                container.append(tr)
            }
        }

       // const commentairesDePosts = function (){
         //   const recupPosts = 
        //}
// 


        ecrirePostsEtTitre()


