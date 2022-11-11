const newPost = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const post = document.querySelector('#post').value.trim();

    if (title && post) {
      console.log(title)
      console.log(post)
      const response = await fetch(`/api/post`, {
        method: 'POST',
        body: JSON.stringify({ title, post }),
        headers: {
            'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create post');
      }
    }
};

const delButton = async (event) => {
  if(event.target.hasAttribute('data-id')){
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/post/${id}`, {
      method: 'DELETE',
    });

    if(response.ok) {
      document.location.replace('/profile')
    } else {
      alert('Failed to delete Project')
    }

  }
}

document
    .querySelector('.new-post-form')
    .addEventListener('submit', newPost);

document
  .querySelector('.deleteButton')
  .addEventListener('click',delButton);