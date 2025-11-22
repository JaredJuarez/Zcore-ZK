pub struct FormData {
    nombre_completo_hash: Field,
    dni_hash: Field,
    email_hash: Field,
    email_verificado: bool,
    telefono_verificado: bool,
    dni_verificado: bool,
    tiene_empleo: bool,
    tipo_empleo: u8,
    ingresos_mensuales_usd: u32,
    antiguedad_trabajo_meses: u32,
    tiene_cuenta_bancaria: bool,
    antiguedad_cuenta_bancaria_meses: u32,
    tiene_tarjeta_credito: bool,
    usa_tarjeta_responsablemente: bool,
    tiene_cuenta_ahorro: bool,
    tuvo_prestamos: bool,
    cantidad_prestamos_pagados: u32,
    prestamos_a_tiempo: bool,
    credito_actual_al_dia: bool,
    tiene_deudas: bool,
    ratio_deuda_ingreso: u32,
    pais_tier: u8,
    campos_vacios: u8,
}

pub struct Form {
    form_data: FormData,
    horizon_score: u32,
}

pub struct ScoreBreakdown {
    pub datos_personales: u32,
    pub situacion_laboral: u32,
    pub situacion_financiera: u32,
    pub horizon_score: u32,
}

impl Form {
    pub fn get_points(self) -> u16 {
        let breakdown = self.calculate_full_score();
        let total_score = breakdown.datos_personales + 
                          breakdown.situacion_laboral + 
                          breakdown.situacion_financiera +
                          breakdown.horizon_score;
        
        total_score as u16
    }
    
    pub fn calculate_full_score(self) -> ScoreBreakdown {
        let datos_personales = self.calculate_personal_score();
        let situacion_laboral = self.calculate_employment_score();
        let situacion_financiera = self.calculate_financial_score();
        
        assert(datos_personales <= 150);
        assert(situacion_laboral <= 200);
        assert(situacion_financiera <= 250);
        
        ScoreBreakdown {
            datos_personales,
            situacion_laboral,
            situacion_financiera,
            horizon_score: self.horizon_score,
        }
    }
    
    fn calculate_personal_score(self) -> u32 {
        let mut score = 0;
        
        if self.form_data.campos_vacios == 0 {
            score += 50;
        } else if self.form_data.campos_vacios <= 2 {
            score += 30;
        } else {
            score += 10;
        }
        
        if self.form_data.dni_verificado { score += 30; }
        if self.form_data.email_verificado { score += 10; }
        if self.form_data.telefono_verificado { score += 10; }
        
        if self.form_data.pais_tier == 1 {
            score += 50;
        } else if self.form_data.pais_tier == 2 {
            score += 35;
        } else if self.form_data.pais_tier == 3 {
            score += 20;
        } else {
            score += 5;
        }
        
        score
    }
    
    fn calculate_employment_score(self) -> u32 {
        let mut score = 0;
        
        
        if self.form_data.tipo_empleo == 5 {
            score += 80;
        } else if self.form_data.tipo_empleo == 4 {
            score += 60;
        } else if self.form_data.tipo_empleo == 3 {
            score += 50;
        } else if self.form_data.tipo_empleo == 2 {
            score += 30;
        } else if self.form_data.tipo_empleo == 1 {
            score += 20;
        }
        
        score += self.calculate_income_score();
        
        if self.form_data.antiguedad_trabajo_meses >= 36 {
            score += 40;
        } else if self.form_data.antiguedad_trabajo_meses >= 24 {
            score += 30;
        } else if self.form_data.antiguedad_trabajo_meses >= 12 {
            score += 20;
        } else if self.form_data.antiguedad_trabajo_meses >= 6 {
            score += 10;
        } else {
            score += 5;
        }
        
        score
    }
    
    fn calculate_income_score(self) -> u32 {
        let income = self.form_data.ingresos_mensuales_usd;
        let tier = self.form_data.pais_tier;
        
        if tier == 1 {
            if income >= 5000 { 80 }
            else if income >= 3000 { 60 }
            else if income >= 1500 { 40 }
            else if income >= 500 { 20 }
            else { 5 }
        } else if tier == 2 {
            if income >= 3000 { 80 }
            else if income >= 1500 { 60 }
            else if income >= 800 { 40 }
            else if income >= 300 { 20 }
            else { 5 }
        } else {
            if income >= 2000 { 80 }
            else if income >= 1000 { 60 }
            else if income >= 500 { 40 }
            else if income >= 200 { 20 }
            else { 5 }
        }
    }
    
    fn calculate_financial_score(self) -> u32 {
        let mut score = 0;
        
        if self.form_data.tiene_cuenta_bancaria {
            if self.form_data.antiguedad_cuenta_bancaria_meses >= 36 {
                score += 50;
            } else if self.form_data.antiguedad_cuenta_bancaria_meses >= 12 {
                score += 30;
            } else {
                score += 15;
            }
        }
        
        if self.form_data.tuvo_prestamos {
            if self.form_data.prestamos_a_tiempo {
                if self.form_data.cantidad_prestamos_pagados >= 2 {
                    score += 100;
                } else if self.form_data.cantidad_prestamos_pagados == 1 {
                    score += 80;
                }
            } else {
                score += 10;
            }
            
            if self.form_data.credito_actual_al_dia & (score < 100) {
                score += 60;
            }
        } else {
            score += 40;
        }
        
        if self.form_data.tiene_tarjeta_credito & self.form_data.usa_tarjeta_responsablemente {
            score += 25;
        }
        if self.form_data.tiene_cuenta_ahorro {
            score += 15;
        }
        
        if !self.form_data.tiene_deudas {
            score += 30;
        } else if self.form_data.ratio_deuda_ingreso < 30 {
            score += 20;
        } else if self.form_data.ratio_deuda_ingreso < 50 {
            score += 10;
        }
        
        if self.form_data.tiene_deudas & (self.form_data.ratio_deuda_ingreso > 70) {
            if score >= 150 {
                score -= 150;
            } else {
                score = 0;
            }
        }
        
        if self.form_data.pais_tier == 4 {
            if score >= 100 {
                score -= 100;
            } else {
                score = 0;
            }
        }
        
        score
    }
}
