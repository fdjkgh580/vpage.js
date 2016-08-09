<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="jquery-3.1.0.min.js"></script>
    <script src="src/jquery.vpage.js"></script>
    <script>
        $(function (){
            $(".my_first_A").vpage({
                name: "page1",
                url: "?page=1",
                state: {a:1},
                onload:  function (){
                    alert('onload 1')
                },
                onpop:  function (){
                    alert('pop 1');
                }
            });

            $(".my_first_B").vpage({
                name: "page2",
                url: "?page=2",
                state: {a:2},
                onload:  function (){
                    alert('onload 2')
                },
                onpop:  function (){
                    alert('pop 2');
                }
            });

            $.vpage.listen();

        })
    </script>
</head>
<body>

    <a class="my_first_A">A</a> <br>
    <a class="my_first_B">B</a> <br>
    
</body>
</html>