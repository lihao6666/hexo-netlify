{% if page.type ==='picture' %}
  <script src="//cdn.jsdelivr.net/npm/minigrid@3.1.1/dist/minigrid.min.js"></script>
  <script type="text/javascript" src="https://blog-1257711631.cos.ap-nanjing.myqcloud.com/js/photo.js"></script>
{% endif %}

{% if page.type == 'music' %}
  <script type="text/javascript" src="https://blog-1257711631.cos.ap-nanjing.myqcloud.com/js/cleanaplayer.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.js"></script>
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.css">
  <script src="https://cdn.jsdelivr.net/npm/meting@1.2.0/dist/Meting.min.js"></script>
{% endif %}