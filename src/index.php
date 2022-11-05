<?php
$test = true; // a true para modo pruebas
include('template-parts/head.php');
if ($test):
  include('template-parts/beta.php');
else:
  include('template-parts/header.php');
  include('template-parts/main.php');
  include('template-parts/footer.php');
endif;
?>
<script>
  // Comportamiento btn 'Saber más'
  function displayMore() {
    let btn = document.getElementById('myBtn');
    let moreText = document.getElementsByClassName('long')[0];
    if (btn.getAttribute('data-btn') == 'more') {
      moreText.style.display = 'block';
      btn.innerHTML = 'Saber menos';
      btn.setAttribute('data-btn', 'less');
    } else {
      moreText.style.display = 'none';
      btn.innerHTML = 'Saber más';
      btn.setAttribute('data-btn', 'more');
    }
  }

  // Actualizar year copyright
//  let year = new Date();
//  document.getElementById('year').innerHTML = year.getFullYear();
</script>
<?php
  include('template-parts/foot.php');
?>
