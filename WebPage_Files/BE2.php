<?php

$con = mysqli_connect("localhost", "fraqjop_iot", "11351", "fraqjop_iot");

if (mysqli_connect_errno($con)) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

mysqli_set_charset($con, "utf8");
  

  $req = $_REQUEST["req"];

if ($req !== "") {
  if($req == "wSlot") {
    $num = $_REQUEST["num"];
    $sta = $_REQUEST["sta"];
    $result = mysqli_query($con, "SELECT SlotStatus, GateStatus FROM Status;");

    while ($data = mysqli_fetch_row($result)) {
      if($data[0]==1 && $sta==2) {
        mysqli_query($con, "truncate Status;");
        mysqli_query($con, "insert into Status(number, SlotStatus, GateStatus, flag) values('$num', '0', '$data[1]', '1');");
        sleep(1);
        mysqli_query($con, "truncate Status;");
        mysqli_query($con, "insert into Status(number, SlotStatus, GateStatus, flag) values('$num', '12', '$data[1]', '0');");
        sleep(14);
        mysqli_query($con, "truncate Status;");
        mysqli_query($con, "insert into Status(number, SlotStatus, GateStatus, flag) values('$num', '2', '$data[1]', '0');");
      }
      if($data[0]==2 && $sta==1) {
        mysqli_query($con, "truncate Status;");
        mysqli_query($con, "insert into Status(number, SlotStatus, GateStatus, flag) values('$num', '21', '$data[1]', '0');");
        sleep(6);
        mysqli_query($con, "truncate Status;");
        mysqli_query($con, "insert into Status(number, SlotStatus, GateStatus, flag) values('$num', '1', '$data[1]', '0');");
      }
    }
  }
}

if ($req !== "") {
  if($req == "wGate") {
    $sta = $_REQUEST["sta"];
    $result = mysqli_query($con, "SELECT SlotStatus, GateStatus FROM Status;");
    while ($data = mysqli_fetch_row($result)) {
      if($data[1]==1 && $sta==0) {
        mysqli_query($con, "truncate Status;");
        mysqli_query($con, "insert into Status(number, SlotStatus, GateStatus, flag) values('2', '$data[0]', '0', '0');");
      }
      if($data[1]==0 && $sta==1) {
        if($data[0] == 1) {
          mysqli_query($con, "truncate Status;");
          mysqli_query($con, "insert into Status(number, SlotStatus, GateStatus, flag) values('2', '$data[0]', '1', '0');");
        }
      }
    }
  }
}


mysqli_close($con);
