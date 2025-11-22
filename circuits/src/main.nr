mod form;
use form::Form;

fn main(form: Form, requirement: pub u16) -> pub u16 {
    let points = form.get_points();
    
    assert(points >= requirement, "No cumple los requisitos");
    
    points
}