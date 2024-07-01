export type PickupLocation = {
   id: number,
   distance: null,
   company_name: string,
   address_line_1: string,
   address_line_2: null | string,
   city: string,
   postal_code: string,
   region: string | null
   country: string
   latitude: number,
   longitude: number,
   timezone: string,
   custom_attribute_1: null,
   custom_attribute_2: null,
   custom_attribute_3: null,
   date_picker_enabled: boolean,
   time_picker_enabled: boolean,
   opening_hours: {
      monday: {
         opens: string
         closes: string
         closed: boolean
      },
      tuesday: {
         opens: string
         closes: string
         closed: boolean
      },
      wednesday: {
         opens: string
         closes: string
         closed: boolean
      },
      thursday: {
         opens: string
         closes: string
         closed: boolean
      },
      friday: {
         opens: string
         closes: string
         closed: boolean
      },
      saturday: {
         opens: string
         closes: string
         closed: boolean
      },
      sunday: {
         opens: string
         closes: string
         closed: boolean
      }
   },
   more_information: null,
   limits_enabled: null
}

export type PickupDates = {
   minDateTime: string,
   minDate: null | string,
   maxDate: null | string,
   minDateSlots: {
      id: number,
      location_id: number,
      day_of_week: string,
      available_from: string,
      available_until: string,
      limited: boolean,
      limit: number
   }[],
   minTime: [string, string],
   maxTime: [string, string],
   disabled: (string | number | boolean | number[])[],
   interval: number,
   daysOfWeek: {
      sunday?: {
         min: {
            hour: string,
            minute: string
         },
         max: {
            hour: string,
            minute: string
         }
      },
      monday?: {
         min: {
            hour: string,
            minute: string
         },
         max: {
            hour: string,
            minute: string
         }
      },
      tuesday?: {
         min: {
            hour: string,
            minute: string
         },
         max: {
            hour: string,
            minute: string
         }
      },
      wednesday?: {
         min: {
            hour: string,
            minute: string
         },
         max: {
            hour: string,
            minute: string
         }
      },
      thursday?: {
         min: {
            hour: string,
            minute: string
         },
         max: {
            hour: string,
            minute: string
         }
      },
      friday?: {
         min: {
            hour: string,
            minute: string
         },
         max: {
            hour: string,
            minute: string
         }
      },
      saturday?: {
         min: {
            hour: string,
            minute: string
         },
         max: {
            hour: string,
            minute: string
         }
      }
   },
   timezone: string
}

export type PickupPagination = {
   total: number,
   per_page: number,
   current_page: number,
   total_pages: number,
   last_page: number,
   next_page_url: null | string,
   prev_page_url: null | string,
   from: number,
   to: number
}

export type PickupTime = {
   id: number,
   location_id: number,
   day_of_week: string,
   available_from: string,
   available_until: string,
   limited: boolean,
   limit: number
}

export type ZapietPickupLocationsOperation = { locations: PickupLocation[], pagination?: PickupPagination }

export type ZapietPickupDatesOperation = PickupDates

export type ZapietPickupTimesOperation = PickupTime[]

export type DeliveryLocation = {
   error: undefined
   id: number,
   external_id: string
   distance: null,
   driving_distance: null,
   company_name: string
   address_line_1: string
   address_line_2: null,
   city: string,
   postal_code: string,
   region: string | null,
   country: string,
   latitude: number,
   longitude: number,
   timezone: string,
   custom_attribute_1: null,
   custom_attribute_2: null,
   custom_attribute_3: null,
   delivery: {
      deliv_enabled: boolean,
      flip_blackout_dates: boolean,
      blackouts: string[],
      monday: {
         blackout_dates: string[],
         breakpoint: string,
         useBreakpoint: boolean,
         before: {
            value: number,
            format: string
         },
         after: {
            value: number,
            format: string
         },
         slots: {
            enabled: boolean,
            slots: {
               id: number,
               day_of_week: string,
               from: string,
               until: string,
               limited: boolean,
               limit: number
            }[]
         }
      },
      tuesday: {
         blackout_dates: string[],
         breakpoint: string,
         useBreakpoint: boolean,
         before: {
            value: number,
            format: string
         },
         after: {
            value: number,
            format: string
         },
         slots: {
            enabled: boolean,
            slots: {
               id: number,
               day_of_week: string,
               from: string,
               until: string,
               limited: boolean,
               limit: number
            }[]
         }
      },
      wednesday: {
         blackout_dates: string[],
         breakpoint: string,
         useBreakpoint: boolean,
         before: {
            value: number,
            format: string
         },
         after: {
            value: number,
            format: string
         },
         slots: {
            enabled: boolean,
            slots: {
               id: number,
               day_of_week: string,
               from: string,
               until: string,
               limited: boolean,
               limit: number
            }[]
         }
      },
      thursday: {
         blackout_dates: string[],
         breakpoint: string,
         useBreakpoint: boolean,
         before: {
            value: number,
            format: string
         },
         after: {
            value: number,
            format: string
         },
         slots: {
            enabled: boolean,
            slots: {
               id: number,
               day_of_week: string,
               from: string,
               until: string,
               limited: boolean,
               limit: number
            }[]
         }
      },
      friday: {
         blackout_dates: string[],
         breakpoint: string,
         useBreakpoint: boolean,
         before: {
            value: number,
            format: string
         },
         after: {
            value: number,
            format: string
         },
         slots: {
            enabled: boolean,
            slots: {
               id: number,
               day_of_week: string,
               from: string,
               until: string,
               limited: boolean,
               limit: number
            }[]
         }
      },
      saturday: {
         blackout_dates: string[],
         breakpoint: string,
         useBreakpoint: boolean,
         before: {
            value: number,
            format: string
         },
         after: {
            value: number,
            format: string
         },
         slots: {
            enabled: boolean,
            slots: {
               id: number,
               day_of_week: string,
               from: string,
               until: string,
               limited: boolean,
               limit: number
            }[]
         }
      },
      sunday: {
         blackout_dates: string[],
         breakpoint: string,
         useBreakpoint: boolean,
         before: {
            value: number,
            format: string
         },
         after: {
            value: number,
            format: string
         },
         slots: {
            enabled: boolean,
            slots: {
               id: number,
               day_of_week: string,
               from: string,
               until: string,
               limited: boolean,
               limit: number
            }[]
         }
      }
   },
   current_time: string
}

export type DeliveryLocationError = {
   error: {
      code: string,
      message: string
   }
}

export type DeliveryDates = {
   minDateTime: string,
   minDate: null | string,
   maxDate: null | string,
   minTime: [string, string],
   maxTime: [string, string],
   disabled: (string | number | boolean | number[])[],
   minDateSlots: {
      id: number,
      day_of_week: string,
      available_from: string,
      available_until: string,
      limited: boolean,
      limit: number
   }[],
   datePickerEnabled: boolean,
   timePickerEnabled: boolean,
   timezone: string
}

export type DeliveryTime = {
   "id": number,
   "day_of_week": string,
   "available_from": string,
   "available_until": string,
   "limited": boolean,
   "limit": number
}

export type ZapietDeliveryLocationsOperation = DeliveryLocation | DeliveryLocationError

export type ZapietDeliveryDatesOperation = DeliveryDates

export type ZapietDeliveryTimesOperation = DeliveryTime[]