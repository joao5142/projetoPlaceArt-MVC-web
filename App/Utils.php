<?php
    class Utils{
        public static function verificarLogado(){
            
            if(isset($_SESSION) && $_SESSION['id']!=''){
                return true;
            } else{
                header('location:/miniframework/public/');
            }
        }

       

    }


?>