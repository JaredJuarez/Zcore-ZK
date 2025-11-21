mod form;

use form::Form;

fn main(form: Form, requirement: u16) -> pub u16 {
    let points = form.get_points();

    assert(points >= requirement);

    requirement
}
