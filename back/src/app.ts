// const express = require('express');
import { json } from "body-parser";
import express, { NextFunction, Request, Response } from "express";
import employeeRoutes from "./routes/employee";
const app = express();
app.use((req, res, next) => {
  console.log("welcome to backend... ", req.url, req.params);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, PUT, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(json());
app.use("/api", employeeRoutes);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: "error message" });
});

app.listen(3004);
