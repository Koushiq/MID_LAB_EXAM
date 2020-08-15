$(document).ready(function(){
    $('#searchbtn').click(function(){
        var value = $('#searchvalue').val();
        var rbbtnval = $('input[name=select]:checked').val();
       // var rbtnval2 = $("#rbUsernameid").val();

        if(value!='' && rbbtnval!=undefined)
        {
           if(rbbtnval=='empid')
           {
            $.ajax({
                url:"getdata/byid/"+value,
                method: 'GET',
                success: function(data) {
                    
                $('.tb').empty();
                let mainTable = '<table border="1px"><th>Empid</th><th>Username</th><th>Phonenumber</th><th>Gender</th><th>Designation</th><th>Propic Path</th>';
        
                for(var i=0;i<data.length;i++)
                {
                    let tablehtml = `<tr>
                                        <td>${data[i].empid}</td>
                                        <td>${data[i].username}</td>
                                        <td>${data[i].phonenumber}</td>
                                        <td>${data[i].gender}</td>
                                        <td>${data[i].designation}</td>
                                        <td>${data[i].propic}</td>
                                    </tr>`;
                    mainTable += tablehtml;
                   
                }
                mainTable += '</table>';
                $('.tb').html(mainTable);
                
              },
              });
           }
           else if(rbbtnval=='username')
           {
                $.ajax({
                    url:"getdata/byusername/"+value,
                    method: 'GET',
                    success: function(data) {
                    
                        $('.tb').empty();
                        let mainTable = '<table border="1px"><th>Empid</th><th>Username</th><th>Phonenumber</th><th>Gender</th><th>Designation</th><th>Propic Path</th>';
                
                        for(var i=0;i<data.length;i++)
                        {
                            let tablehtml = `<tr>
                                                <td>${data[i].empid}</td>
                                                <td>${data[i].username}</td>
                                                <td>${data[i].phonenumber}</td>
                                                <td>${data[i].gender}</td>
                                                <td>${data[i].designation}</td>
                                                <td>${data[i].propic}</td>
                                            </tr>`;
                            mainTable += tablehtml;
                           
                        }
                        mainTable += '</table>';
                        $('.tb').html(mainTable);
                        
                      },
                });
           }
        }
        else
        {
            alert("Search Value and Filter Option Both has to be selected!");
        }

        //console.log(rbtnval2);
        //if(value=='' || )
    });

});