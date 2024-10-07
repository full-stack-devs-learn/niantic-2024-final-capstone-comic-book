package com.niantic.models;

import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Getter
@Setter
public class Trade {
    private int tradeId;
    private int userAId;
    private int userBId;
    private int comicABookId;
    private int comicBBookId;
    private String tradeStatus;
    private boolean userAReceived;
    private boolean userBReceived;

    public Trade() {
    }

    public Trade(int tradeId, int userAId, int userBId, int comicABookId, int comicBBookId, String tradeStatus, boolean userAReceived, boolean userBReceived) {
        this.tradeId = tradeId;
        this.userAId = userAId;
        this.userBId = userBId;
        this.comicABookId = comicABookId;
        this.comicBBookId = comicBBookId;
        this.tradeStatus = tradeStatus;
        this.userAReceived = userAReceived;
        this.userBReceived = userBReceived;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Trade trade = (Trade) o;
        return tradeId == trade.tradeId &&
                userAId == trade.userAId &&
                userBId == trade.userBId &&
                comicABookId == trade.comicABookId &&
                comicBBookId == trade.comicBBookId &&
                userAReceived == trade.userAReceived &&
                userBReceived == trade.userBReceived &&
                Objects.equals(tradeStatus, trade.tradeStatus);
    }

    @Override
    public int hashCode() {
        return Objects.hash(tradeId, userAId, userBId, comicABookId, comicBBookId, tradeStatus, userAReceived, userBReceived);
    }

    @Override
    public String toString() {
        return STR."Trade{tradeId=\{tradeId}, userAId=\{userAId}, userBId=\{userBId}, comicABookId=\{comicABookId}, comicBBookId=\{comicBBookId}, tradeStatus='\{tradeStatus}', userAReceived=\{userAReceived}, userBReceived=\{userBReceived}}";
    }
}
