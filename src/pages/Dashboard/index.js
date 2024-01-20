import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { db } from "../../firebase";
import DeleteSweepTwoToneIcon from "@mui/icons-material/DeleteSweepTwoTone";
import EditIcon from "@mui/icons-material/Edit";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import {
  addDoc,
  getDocs,
  collection,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [userData, setUserData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  // navbaar
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const addData = async (element) => {
    try {
      element.preventDefault();

      const userObj = {
        data,
      };
      const docRef = await addDoc(collection(db, "users"), userObj);
      console.log(docRef);
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const arr = [];
      const docSnap = await getDocs(collection(db, "users"));

      docSnap.forEach((doc) => {
        arr.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setUserData([...arr]);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getData();
  }, [refresh]);

  const editData = async (id) => {
    console.log("editData", id);
    const editValue = prompt("What do you want to");

    const userObj = {
      data: editValue,
    };

    await updateDoc(doc(db, "users", id), userObj);
    setRefresh(!refresh);
  };
  const deleteData = async (id) => {
    const docRef = doc(db, "users", id);
    const del = await deleteDoc(docRef);
    const userObj = {
      data: del,
    };
    setRefresh(!refresh);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <FormGroup>
          <FormControlLabel
            control={
              <Button
                variant="outlined"
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                }}
              >
                LOGOUT
              </Button>
            }
          />
        </FormGroup>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 60 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              TODO APP
            </Typography>
            {auth && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>

      {/* todo */}
      <Box
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          "& > :not(style)": { m: 5, width: "75ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Typography
          level="h1"
          sx={{
            textAlign: "center",
          }}
        >
          TODO LIST
        </Typography>
        <TextField
          onChange={(e) => setData(e.target.value)}
          id="outlined-basic"
          label="Whats in your mind..."
          variant="outlined"
        />
        <Button onClick={addData}>ADD</Button>
        <div>
          {userData.map((user, index) => (
            <div
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1px solid #ddd",
                borderRadius: "5px",
                padding: "8px",
                margin: "8px 0",
              }}
            >
              <ul>
                <span
                  sx={{
                    m: 5,
                    textAlign: "center",
                    fontSize: "1.2rem",
                  }}
                >
                  {user.data}
                </span>
              </ul>
              <div
                sx={{
                  display: "flex",
                  gap: "8px",
                }}
              >
                <Button onClick={() => editData(user.id)}>
                  <EditIcon />
                </Button>
                <Button onClick={() => deleteData(user.id)}>
                  <DeleteSweepTwoToneIcon />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Box>
    </>
  );
};

export default Dashboard;
