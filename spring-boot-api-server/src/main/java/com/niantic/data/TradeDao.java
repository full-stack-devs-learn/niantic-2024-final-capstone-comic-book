package com.niantic.data;

import com.niantic.models.Trade;
import java.util.List;

public interface TradeDao {

    Trade getTradeByTradeId(int tradeId);

    List<Trade> getAllTrades();

    Trade addTrade(Trade trade);

    void updateTradeStatus(int tradeId, String status);

    void updateTradeReceived(int tradeId, int userId, boolean received);

    void deleteTrade(int tradeId);
}
