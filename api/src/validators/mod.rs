//! Custom validation functions for request payloads.
//!
//! This module provides validation helpers used with the `validator` crate
//! to perform cross-field validation that cannot be expressed with simple
//! field-level attributes.
//!
//! # Modules
//!
//! - [`password_match`] - Password confirmation validation for sign-up and password-update flows

pub mod password_match;
