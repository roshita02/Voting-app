class Vote < ApplicationRecord
    def self.totals
        [Vote.where(color: 'red').count, Vote.where(color: 'blue').count]
    end
end
