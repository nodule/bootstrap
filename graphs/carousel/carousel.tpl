 <!-- Carousel
    ================================================== -->
<div id="{{id}}" class="carousel slide" data-ride="carousel">
  <!-- Indicators -->
  <ol class="carousel-indicators">
   {{#each items}}
    <li data-target="#{{id}}" data-slide-to="{{@index}}" class="{{this.active}}"></li>
   {{/each}}
  </ol>
  <div class="carousel-inner">
   {{#each items}}
    <div class="item active">
      <img data-src="holder.js/900x500/auto/#777:#7a7a7a/text:First slide" alt="First slide">
      <div class="container">
        <div class="carousel-caption">
          <h1>{{this.headline}}.</h1>
          {{&this.body}}
        </div>
      </div>
    </div>
   {{/each}}
  </div>
  <a class="left carousel-control" href="#{{id}}" data-slide="prev"><span class="glyphicon glyphicon-chevron-left"></span></a>
  <a class="right carousel-control" href="#{{id}}" data-slide="next"><span class="glyphicon glyphicon-chevron-right"></span></a>
</div><!-- /.carousel -->
