// This is the JavaScript code to update posts to the Admin Page


{
  let articlesBlock = document.querySelector('.articles');
  let updateForm = document.querySelector('.update-post-form');

  let titleInput = document.querySelector('#update-title');
  let textArea = document.querySelector('#update-text');
  let id;

  articlesBlock.addEventListener('click', async function(e) {

      if(e.target.classList.contains('btn-edit')) {

        id = e.target.parentNode.parentNode.querySelector('.id').value;

        let postInfo = await fetch('/posts/' + id).then(
                 (response) => response.json()).then((data) => data);


        titleInput.value = postInfo.title;
        textArea.value = postInfo.text;

        //UPDATE UI
        let articlesTab = document.getElementById('v-pills-articles');
        articlesTab.classList.remove('show');
        articlesTab.classList.remove('active');

        let updateTab = document.getElementById('v-pills-update-post');
        updateTab.classList.add('show');
        updateTab.classList.add('active');
      }
    });

    updateForm.addEventListener('submit', function(e) {
      e.preventDefault();
        console.log("updateForm Event Listener on update-post.js!!");


        fetch('/posts/' + id, {
            method: 'PUT',
             headers: {
               'Content-Type': 'application/json'
             },
             body: JSON.stringify({
               title: titleInput.value,
               text: textArea.value,
               description: textArea.value.substring(0, textArea.value.indexOf('.') + 1)
             })
        }).then((response) => response.text()).then(() => window.history.go());
    })


}
