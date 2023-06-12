import { Router, Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";

import connection from "../db/connection";
import { IPost } from "@simplytasks/common/src/types";
import { ResultSetHeader, RowDataPacket } from "mysql2";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
    return res.status(200).json({ msg: "Hello from /user" });
});

// Operations
router.get("/all", (req, res) => {
    try {
        connection.query("SELECT * FROM posts", (err, raw) => {
            if (err) return res.status(401).json({ msg: "SQL Error", err });

            const query_result = raw as RowDataPacket[];
            if (query_result.length === 0) return res.status(404).json({ msg: "Not found", err: "Not found" });

            return res.status(200).json({ msg: "Success", data: query_result });
        });
    } catch (err) {
        return res.status(500).json({ msg: "Unhandled exception", err });
    }
});

// Get by ID
router.get("/byId/:id", (req: Request, res: Response) => {
    try {
        connection.query("SELECT * FROM posts WHERE id = ?", [req.params.id], (err, raw) => {
            if (err) return res.status(401).json({ msg: "SQL Error", err });

            const query_result = (raw as RowDataPacket[])[0];
            if (query_result.length === 0) return res.status(404).json({ msg: "Not found", err: "Not found" });

            const post: IPost = {
                id: query_result.id,
                user_id: query_result.user_id,
                name: query_result.name,
                desc: query_result.desc,
                from: query_result.from,
                until: query_result.until,
                priority: query_result.priority,
                completed: query_result.completed
            };
            res.status(200).json({ msg: "Success", data: post });
        });
    } catch (err) {
        return res.status(500).json({ msg: "Unhandled exception", err });
    }
});

// Get by name
router.get("/byUserId/:user_id", (req: Request, res: Response) => {
    try {
        connection.query("SELECT * FROM posts WHERE user_id = ?", [req.params.user_id], (err, raw) => {
            if (err) return res.status(401).json({ msg: "SQL Error", err });

            const query_result = (raw as RowDataPacket[])[0];
            if (query_result.length === 0) return res.status(404).json({ msg: "Not found", err: "Not found" });

            const post: IPost = {
                id: query_result.id,
                user_id: query_result.user_id,
                name: query_result.name,
                desc: query_result.desc,
                from: query_result.from,
                until: query_result.until,
                priority: query_result.priority,
                completed: query_result.completed
            };
            res.status(200).json({ msg: "Success", data: post });
        });
    } catch (err) {
        return res.status(500).json({ msg: "Unhandled exception", err });
    }
});

// Add new
router.post("/add", (req: Request, res: Response) => {
    try {
        const { user_id, name, desc, from, until, priority, completed } = req.body;

        if (!user_id) return res.status(401).json({ msg: "Missing User ID", data: null });
        if (!name) return res.status(401).json({ msg: "Missing Post Name", data: null });
        if (!desc) return res.status(401).json({ msg: "Missing Post Description", data: null });
        if (!from) return res.status(401).json({ msg: "Missing Post Start Date", data: null });
        if (!until) return res.status(401).json({ msg: "Missing Post End Date", data: null });
        if (!priority) return res.status(401).json({ msg: "Missing Post Priority", data: null });
        if (!completed) return res.status(401).json({ msg: "Missing Post Completion Status", data: null });

        // Check if the user already exists
        var found = false;
        connection.query("SELECT * FROM users WHERE id=?", [user_id], (err, raw) => {
            if (err) return res.status(401).json({ msg: "SQL Error", err });

            const query_result = raw as RowDataPacket[];
            if (query_result.length === 0) return res.status(401).json({ msg: "User doesn't exist", data: null });

            // Add the new user
            connection.query("INSERT INTO posts(user_id, name, desc, from, until, priority, completed) VALUES(?,?,?,?,?,?,?)", [user_id, name, desc, from, until, priority, completed], (err, raw) => {
                if (err) return res.status(401).json({ msg: "Failed to add the new post", err });
                const query_result = raw as ResultSetHeader;

                const post: IPost = {
                    id: query_result.insertId,
                    user_id, name, desc, from, until, priority, completed
                };

                return res.status(200).json({ msg: "Success", data: post });
            });
        });
    } catch (err) {
        return res.status(500).json({ msg: "Unhandled exception", err });
    }
});

// Edit by ID
router.put("/byId/:id", (req: Request, res: Response) => {
    try {
        const allowedChanges = [ "name", "desc", "from", "until", "priority", "completed" ];
        const records: string[] = [];

        allowedChanges.forEach(change => {
            if (req.body[change]) records.push(change);
        });

        records.forEach((rec, index) => {
            connection.query(`UPDATE posts SET ${rec}=? WHERE id=?`, [req.body[rec], req.params.id], (err, query_result) => {
                if (err) return res.status(401).json({ msg: "Failed to modify the post", err });

                if (index === records.length - 1) {
                    return res.status(200).json({ msg: "Success", data: query_result });
                }
            });
        });
    } catch (err) {
        return res.status(500).json({ msg: "Unhandled exception", err });
    }
});

// Remove by ID
router.delete("/byId/:id", (req: Request, res: Response) => {
    try {
        connection.query("DELETE FROM posts WHERE id=?", [req.params.id], (err, query_result) => {
            if (err) return res.status(401).json({ msg: "Failed to delete the post", err });

            return res.status(200).json({ msg: "Success", data: query_result });
        });
    } catch (err) {
        return res.status(500).json({ msg: "Unhandled exception", err });
    }
});

// Remove all
router.delete("/all", (req: Request, res: Response) => {
    try {
        connection.query("DELETE FROM posts", (err, query_result) => {
            if (err) return res.status(401).json({ msg: "Failed to delete the posts", err });

            return res.status(200).json({ msg: "Success", data: query_result });
        });
    } catch (err) {
        return res.status(500).json({ msg: "Unhandled exception", err });
    }
});

export default router;