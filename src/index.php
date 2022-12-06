<?php
  include('template-parts/head.php');
  include('template-parts/header.php');
  include('template-parts/main.php');
  include('template-parts/footer.php');
?>
<script>
  // Comportamiento btn 'Saber más'
  function displayMore() {
    let btn = document.getElementById('myBtn');
    let moreText = document.getElementsByClassName('long')[0];
    if (btn.getAttribute('data-btn') == 'more') {
      moreText.style.display = 'block';
      //btn.innerHTML = 'Saber menos';
      btn.innerHTML = 'Conóceme menos';
      btn.setAttribute('data-btn', 'less');
    } else {
      moreText.style.display = 'none';
      //btn.innerHTML = 'Saber más';
      btn.innerHTML = 'Conóceme más';
      btn.setAttribute('data-btn', 'more');
    }
  }

  // Actualizar year copyright
  let year = new Date();
  document.getElementById('year').innerHTML = year.getFullYear();
</script>
<?php
  include('template-parts/foot.php');
?>
