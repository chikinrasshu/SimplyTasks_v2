import { Router, Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";

import connection from "../db/connection";
import IUser from "@simplytasks/common/src/types/user";
import { ResultSetHeader, RowDataPacket } from "mysql2";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
    return res.status(200).json({ msg: "Hello from backend/users" });
});

// Get all
router.get("/all", (req: Request, res: Response) => {
    try {
        connection.query("SELECT * FROM users", (err, raw) => {
            if (err) return res.status(404).json({ msg: "Not found", data: err });

            const qres = raw as RowDataPacket[];
            if (qres.length === 0) return res.status(404).json({ msg: "Not found", data: null });

            return res.status(200).json({ msg: "Success", data: qres });
        });
    } catch (err) {
        return res.status(500).json({ msg: "Unknown Error", data: err });
    }
});

// Get by ID
router.get("/byId/:id", (req: Request, res: Response) => {
    try {
        connection.query("SELECT * FROM users WHERE id = ?", [req.params.id], (err, raw) => {
            if (err) return res.status(404).json({ msg: "Not found", data: err });
            const qres = (raw as RowDataPacket[])[0];
            if (qres.length === 0) return res.status(404).json({ msg: "Not found", data: null });

            const user: IUser = {
                id: qres.id,
                name: qres.name,
                mail: qres.mail,
                hash: qres.hash,
                ppic: qres.ppic,
                bpic: qres.bpic
            };
            res.status(200).json({ msg: "Success", data: user });
        });
    } catch (err) {
        return res.status(500).json({ msg: "Unknown Error", data: err });
    }
});

// Get by mail
router.get("/byMail/:mail", (req: Request, res: Response) => {
    try {
        connection.query("SELECT * FROM users WHERE mail = ?", [req.params.mail], (err, raw) => {
            if (err) return res.status(404).json({ msg: "Not found", data: err });
            const qres = (raw as RowDataPacket[])[0];
            if (qres.length === 0) return res.status(404).json({ msg: "Not found", data: null });

            const user: IUser = {
                id: qres.id,
                name: qres.name,
                mail: qres.mail,
                hash: qres.hash,
                ppic: qres.ppic,
                bpic: qres.bpic
            };
            res.status(200).json({ msg: "Success", data: user });
        });
    } catch (err) {
        return res.status(500).json({ msg: "Unknown Error", data: err });
    }
});

// Get by name
router.get("/byName/:name", (req: Request, res: Response) => {
    try {
        connection.query("SELECT * FROM users WHERE name = ?", [req.params.name], (err, raw) => {
            if (err) return res.status(404).json({ msg: "Not found", data: err });
            const qres = (raw as RowDataPacket[])[0];
            if (qres.length === 0) return res.status(404).json({ msg: "Not found", data: null });

            const user: IUser = {
                id: qres.id,
                name: qres.name,
                mail: qres.mail,
                hash: qres.hash,
                ppic: qres.ppic,
                bpic: qres.bpic
            };
            res.status(200).json({ msg: "Success", data: user });
        });
    } catch (err) {
        return res.status(500).json({ msg: "Unknown Error", data: err });
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
            if (err) return res.status(401).json({ msg: "Failed to check the existing user", data: err });
            const qres = raw as RowDataPacket[];
            if (qres.length !== 0) return res.status(401).json({ msg: "User already exists", data: null });

            // Bcrypt the password
            const salt = bcrypt.genSaltSync(12);
            const hash = bcrypt.hashSync(pass, salt);

            // Add the new user
            connection.query("INSERT INTO users(name, mail, hash, ppic, bpic) VALUES(?,?,?,?,?)", [name, mail, hash, ppic, bpic], (err, raw) => {
                if (err) return res.status(401).json({ msg: "Failed to add the new user", data: err });
                const qres = raw as ResultSetHeader;

                const user: IUser = {
                    id: qres.insertId,
                    name, mail, hash, ppic, bpic
                };

                return res.status(200).json({ msg: "Success", data: user });
            });
        });
    } catch (err) {
        return res.status(500).json({ msg: "Unknown Error", data: err });
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
            connection.query(`UPDATE users SET ${rec}=? WHERE id=?`, [req.body[rec], req.params.id], (err, qres) => {
                if (err) return res.status(401).json({ msg: "Failed to modify the user", data: err });

                if (index === records.length - 1) {
                    return res.status(200).json({ msg: "Success", data: qres });
                }
            });
        });
    } catch (err) {
        return res.status(500).json({ msg: "Unknown Error", data: err });
    }
});

// Remove by ID
router.delete("/byId/:id", (req: Request, res: Response) => {
    try {
        connection.query("DELETE FROM users WHERE id=?", [req.params.id], (err, qres) => {
            if (err) return res.status(401).json({ msg: "Failed to delete the user", data: err });

            return res.status(200).json({ msg: "Success", data: qres });
        });
    } catch (err) {
        return res.status(500).json({ msg: "Unknown Error", data: err });
    }
});

// Remove all
router.delete("/all", (req: Request, res: Response) => {
    try {
        connection.query("DELETE FROM users", (err, qres) => {
            if (err) return res.status(401).json({ msg: "Failed to delete the users", data: err });

            return res.status(200).json({ msg: "Success", data: qres });
        });
    } catch (err) {
        return res.status(500).json({ msg: "Unknown Error", data: err });
    }
});

// Login
router.get("/login", (req: Request, res:Response) => {
    try {
        const {mail, pass} = req.body;
        if (!mail) return res.status(401).json({ msg: "Missing Email", data: null });
        if (!pass || pass === "") return res.status(401).json({ msg: "Missing Password", data: null });

        connection.query("SELECT * FROM users WHERE mail=?", [mail], (err, raw) => {
            if (err) return res.status(401).json({ msg: "Failed to delete the users", data: err });

            const qres = (raw as RowDataPacket[])[0];

            // Check the hash agaisnt the provided password
            const matches = bcrypt.compareSync(pass, qres.hash);
            if (!matches) return res.status(401).json({msg: "Invalid credentials", data: null});

            const user: IUser = {
                id: qres.id,
                name: qres.name,
                mail: qres.mail,
                hash: qres.hash,
                ppic: qres.ppic,
                bpic: qres.bpic
            }

            return res.status(200).json({ msg: "Success", data: user });
        });

    } catch(err) {
        return res.status(500).json({msg: "Unknown error", data: err});
    }
});

export default router;