//! API route registration.
//!
//! This module centralizes registration of all HTTP route handlers.

use actix_web::web::ServiceConfig;

use crate::routes::auth::{
    change_password, confirm_email, confirm_email_change, current_user, forgot_password, log_in,
    log_out, refresh_session, request_email_change, set_password, sign_up, verify_forgot_password,
};
use crate::routes::health::health_check;

/// Registers all API routes with the Actix service configuration.
///
/// # Arguments
///
/// - `config` - Mutable Actix service configuration used during app startup.
pub fn configure_routes(config: &mut ServiceConfig) {
    config
        // Health routes
        .service(health_check)
        // Auth routes
        .service(sign_up)
        .service(confirm_email)
        .service(log_in)
        .service(log_out)
        .service(refresh_session)
        .service(current_user)
        .service(request_email_change)
        .service(confirm_email_change)
        .service(forgot_password)
        .service(verify_forgot_password)
        .service(set_password)
        .service(change_password);
}
