module.exports = {
    html:(style, list, script) => {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do-List</title>
    <style>
    ${style}
    </style>
</head>
<body>
    <div class="container">
        <h1>My To-Do App</h1>
        <form action="create_process" method="post" class="create">
            <input type="text" class="text" name="text" placeholder="글을작성해주세요.">
            <input type="submit" value="NewEntry">
        </form>
        <hr>
        ${list}
    </div>
    <script>${script}</script>
</body>
</html>`;},
    list:(result) => {
    var list = '<ul class="list">';
    for(let i=0;i<result.length;i++){
      list = list+`<li>
      <input type="checkbox" name="check" class="checkbox">
      <span>${result[i].description}</span>
      <form action="/delete_process" class="delete" method="post">
      <input type="hidden" name="id" value="${result[i].id}">
      <input type="submit" value="X">
    </form>
      </li>`
    }
    list = list+'</ul>';
    return list;
  }
}