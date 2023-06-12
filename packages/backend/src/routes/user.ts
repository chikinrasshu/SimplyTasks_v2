import { Router, Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";

import connection from "../db/connection";
import { IUser } from "@simplytasks/common/src/types";
import { ResultSetHeader, RowDataPacket } from "mysql2";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
    return res.status(200).json({ msg: "Hello from /user" });
});

// Operations
router.get("/all", (req, res) => {
    try {
        connection.query("SELECT * FROM users", (err, raw) => {
            if (err) return res.status(401).json({msg: "SQL Error", err});

            const query_result = raw as RowDataPacket[];
            if (query_result.length === 0) return res.status(404).json({msg: "Not found", err: "Not found"});

            return res.status(200).json({msg: "Success", data: query_result});
        });
    } catch(err) {
        return res.status(500).json({msg: "Unhandled exception", err});
    }
});

// Get by ID
router.get("/byId/:id", (req: Request, res: Response) => {
    try {
        connection.query("SELECT * FROM users WHERE id = ?", [req.params.id], (err, raw) => {
            if (err) return res.status(401).json({msg: "SQL Error", err});

            const query_result = (raw as RowDataPacket[])[0];
            if (query_result.length === 0) return res.status(404).json({ msg: "Not found", err: "Not found" });

            const user: IUser = {
                id: query_result.id,
                name: query_result.name,
                mail: query_result.mail,
                hash: query_result.hash,
                ppic: query_result.ppic,
                bpic: query_result.bpic
            };
            res.status(200).json({ msg: "Success", data: user });
        });
    } catch (err) {
        return res.status(500).json({msg: "Unhandled exception", err});
    }
});

// Get by mail
router.get("/byMail/:mail", (req: Request, res: Response) => {
    try {
        connection.query("SELECT * FROM users WHERE mail = ?", [req.params.mail], (err, raw) => {
            if (err) return res.status(401).json({msg: "SQL Error", err});

            const query_result = (raw as RowDataPacket[])[0];
            if (query_result.length === 0) return res.status(404).json({ msg: "Not found", err: "Not found" });

            const user: IUser = {
                id: query_result.id,
                name: query_result.name,
                mail: query_result.mail,
                hash: query_result.hash,
                ppic: query_result.ppic,
                bpic: query_result.bpic
            };
            res.status(200).json({ msg: "Success", data: user });
        });
    } catch (err) {
        return res.status(500).json({msg: "Unhandled exception", err});
    }
});

// Get by name
router.get("/byName/:name", (req: Request, res: Response) => {
    try {
        connection.query("SELECT * FROM users WHERE name = ?", [req.params.name], (err, raw) => {
            if (err) return res.status(401).json({msg: "SQL Error", err});

            const query_result = (raw as RowDataPacket[])[0];
            if (query_result.length === 0) return res.status(404).json({ msg: "Not found", err: "Not found" });

            const user: IUser = {
                id: query_result.id,
                name: query_result.name,
                mail: query_result.mail,
                hash: query_result.hash,
                ppic: query_result.ppic,
                bpic: query_result.bpic
            };
            res.status(200).json({ msg: "Success", data: user });
        });
    } catch (err) {
        return res.status(500).json({msg: "Unhandled exception", err});
    }
});

// Add new
router.post("/add", (req: Request, res: Response) => {
    try {
        const { name, mail, pass, ppic, bpic } = req.body;
        if (!name) return res.status(401).json({ msg: "Missing Username", data: null });
        if (!mail) return res.status(401).json({ msg: "Missing Email", data: null });
        if (!pass || pass === "") return res.status(401).json({ msg: "Missing Password", data: null });

        // Check if the user already exists
        var found = false;
        connection.query("SELECT * FROM users WHERE name=? OR mail=?", [name, mail], (err, raw) => {
            if (err) return res.status(401).json({msg: "SQL Error", err});

            const query_result = raw as RowDataPacket[];
            if (query_result.length !== 0) return res.status(401).json({ msg: "User already exists", data: null });

            // Bcrypt the password
            const salt = bcrypt.genSaltSync(12);
            const hash = bcrypt.hashSync(pass, salt);

            // Add the new user
            connection.query("INSERT INTO users(name, mail, hash, ppic, bpic) VALUES(?,?,?,?,?)", [name, mail, hash, ppic, bpic], (err, raw) => {
                if (err) return res.status(401).json({ msg: "Failed to add the new user", err });
                const query_result = raw as ResultSetHeader;

                const user: IUser = {
                    id: query_result.insertId,
                    name, mail, hash, ppic, bpic
                };

                return res.status(200).json({ msg: "Success", data: user });
            });
        });
    } catch (err) {
        return res.status(500).json({msg: "Unhandled exception", err});
    }
});

// Edit by ID
router.put("/byId/:id", (req: Request, res: Response) => {
    try {
        const allowedChanges = ["name", "mail", "pass", "qpic", "bpic"];
        const records: string[] = [];

        allowedChanges.forEach(change => {
            if (req.body[change]) records.push(change);
        });

        records.forEach((rec, index) => {
            connection.query(`UPDATE users SET ${rec}=? WHERE id=?`, [req.body[rec], req.params.id], (err, query_result) => {
                if (err) return res.status(401).json({ msg: "Failed to modify the user", err });

                if (index === records.length - 1) {
                    return res.status(200).json({ msg: "Success", data: query_result });
                }
            });
        });
    } catch (err) {
        return res.status(500).json({msg: "Unhandled exception", err});
    }
});

// Remove by ID
router.delete("/byId/:id", (req: Request, res: Response) => {
    try {
        connection.query("DELETE FROM users WHERE id=?", [req.params.id], (err, query_result) => {
            if (err) return res.status(401).json({ msg: "Failed to delete the user", err });

            return res.status(200).json({ msg: "Success", data: query_result });
        });
    } catch (err) {
        return res.status(500).json({msg: "Unhandled exception", err});
    }
});

// Remove all
router.delete("/all", (req: Request, res: Response) => {
    try {
        connection.query("DELETE FROM users", (err, query_result) => {
            if (err) return res.status(401).json({ msg: "Failed to delete the users", err });

            return res.status(200).json({ msg: "Success", data: query_result });
        });
    } catch (err) {
        return res.status(500).json({msg: "Unhandled exception", err});
    }
});

// Login
router.get("/login", (req: Request, res:Response) => {
    try {
        const {mail, pass} = req.body;
        if (!mail) return res.status(401).json({ msg: "Missing Email", err: "Missing Email" });
        if (!pass || pass === "") return res.status(401).json({ msg: "Missing Password", err: "Missing Password" });

        connection.query("SELECT * FROM users WHERE mail=?", [mail], (err, raw) => {
            if (err) return res.status(401).json({ msg: "Failed to delete the users", err });

            const query_result = (raw as RowDataPacket[])[0];

            // Check the hash agaisnt the provided password
            const matches = bcrypt.compareSync(pass, query_result.hash);
            if (!matches) return res.status(401).json({msg: "Invalid credentials", err: "Invalid credentials"});

            const user: IUser = {
                id: query_result.id,
                name: query_result.name,
                mail: query_result.mail,
                hash: query_result.hash,
                ppic: query_result.ppic,
                bpic: query_result.bpic
            }

            return res.status(200).json({ msg: "Success", data: user });
        });

    } catch(err) {
        return res.status(500).json({msg: "Unhandled exception", err});
    }
});

export default router;