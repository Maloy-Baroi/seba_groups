import React, { useState } from 'react';
import styles from '@/styles/DatePicker.module.css';

const DatePicker = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    return (
        <div className={styles.datepickerContainer}>
            <input
                type="text"
                className={styles.datepickerInput}
                value={selectedDate}
                onChange={handleDateChange}
                placeholder="Select a date"
            />
            {selectedDate && (
                <button className={styles.clearButton} onClick={() => setSelectedDate(null)}>
                    Clear
                </button>
            )}
        </div>
    );
};

export default DatePicker;
