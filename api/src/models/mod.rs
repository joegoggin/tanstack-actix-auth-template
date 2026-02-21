//! Database models representing the core domain entities of the application.
//!
//! This module contains all SQLx-compatible structs that map to database tables,
//! including users and authentication-related entities.

pub mod auth_code;
pub mod refresh_token;
pub mod user;
