pub struct Form {
    num_years: u16,
    num_txs: u16,
}

impl Form {
    pub fn get_points(self) -> u16 {
        let first = if self.num_years >= 3 { 10 } else { 0 };
        let second = if self.num_txs >= 1000 { 20 } else { 0 };

        first + second
    }
}