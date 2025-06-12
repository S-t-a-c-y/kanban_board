
  function showModal() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('modal').style.display = 'block';
  }

  function addFunction() {
    const form = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      assignee: document.getElementById('assignee').value,
      priority: document.getElementById('priority').value,
      data: document.getElementById('date-modal').value
    }
    console.log(form);
    sessionStorage.setItem('form', JSON.stringify(form));
  }


  window.onload = () => {
    const form = JSON.parse(sessionStorage.getItem('form'));
    console.log(form);
    const date = document.getElementById('date-1');

    document.getElementById('title-1').innerText = form.title ?? '';
    document.getElementById('priority-1').innerText = form.priority ?? '';
    document.getElementById('name-1').innerText = form.assignee ?? '';
    document.getElementById('description-1').innerText = form.description ?? '';

    form.data ? date.innerText = form.data : date.parentElement.style.display = 'none';
  };



  // window.onload = () => {
  //   const form = JSON.parse(sessionStorage.getItem('form'));

  //   const arr = [
  //     document.getElementById('title-1'),
  //     document.getElementById('priority-1'),
  //     document.getElementById('name-1'),
  //     document.getElementById('description-1'),
  //     document.getElementById('date-1')
  //   ]

  //   for (let i = 0; i <= arr.length; i++) {
  //     if (arr[i]) {
  //       arr[i].innerText = 
  //     }
  //   }
  }