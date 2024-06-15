from flask import Blueprint, render_template

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def main():
    """
    This function is the main route for the application.
    It renders the 'index.html' template when the root URL ('/') is accessed.

    Parameters:
    None

    Returns:
    render_template: A function call that renders the 'index.html' template.
    """
    return render_template('index.html')