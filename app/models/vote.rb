class Vote < ApplicationRecord
    def self.totals
        [VOte.where(color: 'red').count, Vote.where(color: 'blue').count]
    end
end
